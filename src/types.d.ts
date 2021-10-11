declare class PasswordCredential extends Credential {
  constructor(
    passwordCredentialData: {
      iconURL?: string;
      id: string;
      name?: string;
      password: string;
    },
  );
  password?: string;
}

interface CredentialsContainer {
  get(options: { password: boolean }): Promise<Credential | null>;
}
