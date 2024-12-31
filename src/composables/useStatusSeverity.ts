export function useStatusSeverity() {
  function getStatusSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'running':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'info';
    }
  }

  return {
    getStatusSeverity
  };
}