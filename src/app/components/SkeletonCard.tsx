export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="animate-pulse">
        <div style={{ background: '#ececec', aspectRatio: '4/3' }} />
        <div className="p-4 flex flex-col gap-2">
          <div style={{ height: '12px', width: '60%', background: '#ececec', borderRadius: '6px' }} />
          <div style={{ height: '16px', width: '80%', background: '#e0e0e0', borderRadius: '6px' }} />
          <div style={{ height: '8px', width: '100%', background: '#ececec', borderRadius: '4px', marginTop: '4px' }} />
          <div className="flex items-center justify-between mt-2">
            <div>
              <div style={{ height: '20px', width: '70px', background: '#e0e0e0', borderRadius: '6px' }} />
              <div style={{ height: '12px', width: '50px', background: '#ececec', borderRadius: '6px', marginTop: '4px' }} />
            </div>
            <div style={{ height: '36px', width: '72px', background: '#ececec', borderRadius: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
