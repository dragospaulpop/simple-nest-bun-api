import { Injectable, NestMiddleware } from "@nestjs/common";
import { Counter, register } from "prom-client";

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  private readonly httpRequestsTotal: Counter<string>;

  constructor() {
    // Reuse existing metric if already registered
    const existing = register.getSingleMetric("http_requests_total");
    if (existing) {
      this.httpRequestsTotal = existing as Counter<string>;
    } else {
      this.httpRequestsTotal = new Counter({
        name: "http_requests_total",
        help: "Total number of HTTP requests",
        labelNames: ["method", "route", "status"],
      });
    }
  }

  use(req: any, res: any, next: () => void) {
    res.on("finish", () => {
      this.httpRequestsTotal.inc({
        method: req.method,
        route: req.route?.path || req.url,
        status: res.statusCode,
      });
    });
    next();
  }
}
