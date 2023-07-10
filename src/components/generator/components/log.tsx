type props = {
  log: string[];
};

export function Log(props: props) {
  const { log: _log } = props;
  return (
    <div style={{ width: '30%', whiteSpace: 'pre-wrap' }}>
      {_log.map((entity: string) => {
        return <div>{entity}</div>;
      })}
    </div>
  );
}
