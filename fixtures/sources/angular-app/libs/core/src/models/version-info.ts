/**
 * Data structure containing build/versioning information about the application.
 *
 * @public
 */
export interface VersionInfo {
  /**
   * The semantic version of the application.
   */
  semVer: string;

  /**
   * The full build metadata which consists of the semantic version and additional information such as the GIT commit hash from which the application bundle has been created.
   */
  fullBuildMetaData: string;

  /**
   * The GIT commit hash from which the application bundle has been created.
   */
  gitHash: string;

  /**
   * The date (and time) at which the application bundle has been created.
   */
  date: string;
}
