import subprocess
import sys

root = __import__("pathlib").Path(__file__).parent

procs = [
    subprocess.Popen("npx tsx src/server.ts", cwd=root / "backend", shell=True),
    subprocess.Popen("npm run dev", cwd=root / "frontend", shell=True),
    subprocess.Popen("python livefeed.py", cwd=root / "backend/src", shell=True),
]

def kill(p):
    if sys.platform == "win32":
        subprocess.run(["taskkill", "/F", "/T", "/PID", str(p.pid)], capture_output=True)
    else:
        p.terminate()

try:
    for p in procs:
        p.wait()
except KeyboardInterrupt:
    for p in procs:
        kill(p)
    sys.exit(0)
