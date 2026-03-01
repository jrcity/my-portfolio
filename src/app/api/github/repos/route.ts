import { NextRequest, NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  [key: string]: any; // allows additional GitHub fields
}

interface RateLimitMeta {
  limit: string | null;
  remaining: string | null;
  reset: string | null;
}

interface SuccessResponse {
  success: true;
  data: GitHubRepo[];
  meta: {
    count: number;
    rateLimit: RateLimitMeta;
  };
}

interface ErrorResponse {
  success?: false;
  error: string;
  message: string;
  status?: number;
}

export async function GET(req: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'jrcity';

  console.log('🔧 API Route - GitHub Repos:');
  console.log('  - Token available:', !!token);
  console.log('  - Username:', username);

  if (!token) {
    console.error('❌ No GitHub token found in environment variables');
    return NextResponse.json<ErrorResponse>(
      {
        error: 'GitHub token not configured',
        message: 'GITHUB_TOKEN environment variable is missing',
      },
      { status: 500 }
    );
  }

  // We no longer need to error if username is missing since we default to 'jrcity'

  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') || 'updated';
  const per_page = searchParams.get('per_page') || '20';
  const page = searchParams.get('page') || '1';

  const url = `https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${per_page}&page=${page}`;

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Your-Portfolio-Site/1.0',
  };

  console.log('🚀 Making request to GitHub API:');
  console.log('  📍 URL:', url);
  console.log('  🔧 Headers:', {
    ...headers,
    Authorization: `Bearer ${token.substring(0, 20)}...`,
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    console.log('📥 GitHub API Response:');
    console.log('  📊 Status:', response.status);
    console.log('  📈 Status Text:', response.statusText);

    // Rate limit info
    const rateLimit: RateLimitMeta = {
      limit: response.headers.get('x-ratelimit-limit'),
      remaining: response.headers.get('x-ratelimit-remaining'),
      reset: response.headers.get('x-ratelimit-reset'),
    };

    console.log('  🚦 Rate Limit:');
    console.log(`    Limit: ${rateLimit.limit}`);
    console.log(`    Remaining: ${rateLimit.remaining}`);
    console.log(
      `    Reset: ${
        rateLimit.reset
          ? new Date(Number(rateLimit.reset) * 1000).toLocaleString()
          : 'N/A'
      }`
    );

    const data: GitHubRepo[] | { message: string } = await response.json();

    if (!response.ok) {
      console.error('❌ GitHub API Error:', data);
      return NextResponse.json<ErrorResponse>(
        {
          error: 'GitHub API Error',
          message:
            typeof data === 'object' && 'message' in data
              ? data.message
              : 'Unknown error',
          status: response.status,
        },
        { status: response.status }
      );
    }

    console.log(`✅ Successfully fetched ${(data as GitHubRepo[]).length} repositories`);

    return NextResponse.json<SuccessResponse>(
      {
        success: true,
        data: data as GitHubRepo[],
        meta: {
          count: (data as GitHubRepo[]).length,
          rateLimit,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('💥 Fetch error:', err);
    return NextResponse.json<ErrorResponse>(
      {
        error: 'Internal Server Error',
        message: err.message,
      },
      { status: 500 }
    );
  }
}

// Reject other HTTP methods
export async function POST(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json<ErrorResponse>(
    { error: 'Method not allowed', message: 'Only GET requests are supported' },
    { status: 405 }
  );
}
