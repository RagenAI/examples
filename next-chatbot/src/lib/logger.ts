import pino from "pino";
import pretty from "pino-pretty";

const streams = [];

// Ensure this file only runs on the server
if (typeof window !== "undefined") {
  throw new Error("This module should only be used on the server side");
}

streams.push({
  stream: pretty({
    colorize: true,
  }),
});

const logger = pino(
  {
    level: "debug",
    base: {
      pid: process.pid,
      hostname: process.env.HOSTNAME,
    },
  },
  streams.length ? pino.multistream(streams) : pino.destination()
);

logger.info("Server logger initialized");

export { logger };
