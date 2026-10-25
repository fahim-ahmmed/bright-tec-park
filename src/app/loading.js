'use client';
import { Loader } from '@gravity-ui/uikit';

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading">
      <Loader size="l" />
    </div>
  );
}
