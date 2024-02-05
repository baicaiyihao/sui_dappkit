
export function QueryDigest({ id }: { id: string }) {

  // 展示本次交易obeject中的内容。
  return (
    <div>
      <h3>Game Result:</h3>
      <ul>
        { id }
      </ul>
    </div>
  );
}

