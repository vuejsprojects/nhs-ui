set -x
npm run serve &
sleep 1
echo $! > .pidfile