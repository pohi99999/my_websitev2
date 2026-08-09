import sys

def run():
    sys.path.insert(0, "/usr/local/lib/python3.10/dist-packages")
    try:
        from jules import tools
        tools.submit(
            branch_name="jules-12836571153665607092-0ed3d007",
            commit_message="""🔒 [security fix] Add rate limiting to demo webhook proxy and fix Netlify config

🎯 What: Missing rate limiting in the demo webhook proxy (`/api/instant-responder/demo/route.ts`). Also, Netlify CI builds failed due to misconfiguration.

⚠️ Risk: Without rate limiting, the webhook proxy can be easily abused by attackers, possibly resulting in exhaustion of webhook invocations limits or causing downstream denial of service.

🛡️ Solution: Import `checkRateLimit` from `../../chat/rate-limiter` and use it to rate limit requests by the user's IP address. If the limit is exceeded, return a 429 status code. Additionally, fix Netlify config by removing `publish = ".next"` and setting `NODE_VERSION` to `20`."""
        )
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

run()
