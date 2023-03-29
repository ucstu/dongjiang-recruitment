import httpProxy from "http-proxy";
import { readFileSync, watchFile } from "node:fs";
import http from "node:http";
import { resolve } from "node:path";

type Services = Array<{
  name: string;
  prefix: string;
  current: "local" | "remote";
  local: {
    host: string;
    protocol: "http" | "https";
    port: number;
  };
  remote: {
    host: string;
    protocol: "http" | "https";
    port: number;
  };
}>;

let services = JSON.parse(
  readFileSync(resolve(process.cwd(), "services.json")).toString()
) as Services;

watchFile(resolve(process.cwd(), "services.json"), () => {
  console.log("\x1b[34m%s\x1b[0m", "services.json changed");
  services = JSON.parse(
    readFileSync(resolve(process.cwd(), "services.json")).toString()
  ) as Services;
});

const proxy = httpProxy.createProxyServer({
  autoRewrite: true,
  changeOrigin: true,
});

const server = http.createServer((req, res) => {
  try {
    for (const service of services) {
      if (req.url?.startsWith(service.prefix)) {
        const { host, protocol, port } = service[service.current];
        proxy.web(req, res, {
          target: `${protocol}://${host}:${port}`,
        });
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
});

server.listen(3000);
console.log("\x1b[34m%s\x1b[0m", "Proxy server started on port 3000");
