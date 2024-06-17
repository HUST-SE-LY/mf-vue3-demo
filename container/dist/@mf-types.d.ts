
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/public/PublicButton';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/public/PublicButton' ? typeof import('REMOTE_ALIAS_IDENTIFIER/public/PublicButton') :any;