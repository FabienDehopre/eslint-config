import type { GlobalConfig } from 'devextreme/common';
import type { RequireAtLeastOne } from 'type-fest';

export type DxGlobalConfig = RequireAtLeastOne<GlobalConfig, 'licenseKey'>;
