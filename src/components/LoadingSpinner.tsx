export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white" />
    </div>
  );
}
