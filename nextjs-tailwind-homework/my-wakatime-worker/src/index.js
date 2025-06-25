export default {
  async fetch(request, env, ctx) {
    // 允许所有来源的 CORS 请求 (在生产环境中您可能希望更严格)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    // 从环境变量中获取 Wakatime API Key
    const WAKATIME_API_KEY = env.WAKATIME_API_KEY;
    if (!WAKATIME_API_KEY) {
      return new Response('WAKATIME_API_KEY not set', { status: 500 });
    }
    const wakatimeUrl = `https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${WAKATIME_API_KEY}`;
    try {
      const wakatimeResponse = await fetch(wakatimeUrl);
      if (!wakatimeResponse.ok) {
        const errorText = await wakatimeResponse.text();
        console.error(`Wakatime API error: ${wakatimeResponse.status} ${errorText}`);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch data from Wakatime API', details: errorText }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      const data = await wakatimeResponse.json();
      // 返回 Wakatime 数据
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching Wakatime data:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error in Worker', details: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
