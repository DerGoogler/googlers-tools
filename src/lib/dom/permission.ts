/**
 * @usage
 * ```ts
 * permission("clipboard-write").then((pm: PermissionStatus) => {
 *   console.log(pm.state)
 * });
 * ```
 * @param permission
 * @returns
 */
export default async function(permission: string): Promise<PermissionStatus> {
  const permissionName = permission as PermissionName;
  const permissionStatus = await navigator.permissions.query({ name: permissionName });
  // Will be 'granted', 'denied' or 'prompt':
  return permissionStatus;
}
