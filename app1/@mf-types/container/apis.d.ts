
    export type RemoteKeys = 'container/public/PublicButton';
    type PackageType<T> = T extends 'container/public/PublicButton' ? typeof import('container/public/PublicButton') :any;