import { Connection } from "../contexts/QueryContext.ts";

export const formatConnection = (connection: Connection) =>
  `${connection.username ?? "admin"}@${connection.hostname ??
    "localhost"}:${connection.port ?? 3306}`;
