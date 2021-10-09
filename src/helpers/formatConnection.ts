import { Connection } from "../features/connectionSlice.ts";

export const formatConnection = (connection: Connection) =>
  `${connection.username ?? "admin"}@${connection.hostname ??
    "localhost"}:${connection.port ?? 3306}`;
