import { Connection } from "../features/connectionSlice.ts";

export const formatConnection = (
  connection: Connection,
  includeProxy = false,
) =>
  `${connection.username ?? "admin"}@${connection.hostname ??
    "localhost"}:${connection.port ?? 3306}${
    includeProxy ? ` ${connection.proxy ?? "(via http://localhost:3000)"}` : ""
  }`;
