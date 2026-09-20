import subprocess
import sys

root = __import__("pathlib").Path(__file__).parent

procs = [
    subprocess.Popen("npx tsx src/server.ts", cwd=root / "backend", shell=True),
    subprocess.Popen("npm run dev", cwd=root / "frontend", shell=True),
]

try:
    for p in procs:
        p.wait()
except KeyboardInterrupt:
    for p in procs:
        p.terminate()
    sys.exit(0)
