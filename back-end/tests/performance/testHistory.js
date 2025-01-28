import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 210, 
  duration: "30s", 
};

export default function () {

  const url = "http://localhost:5000/analysis";

  const params = {
    headers: {
     'Cookie': 'connect.sid=s%3AuBGvAa47WTlLEpXyavr87mc4AWbpqQIg.EV5Up%2BNht4eEe77cyV8E5YrxJH8vYzYQrx%2FUJVkM9N4',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status was 200': (r) => r.status === 200,
    'response contains history': (r) => r.body.includes('history'),
  });

  sleep(1);
}
