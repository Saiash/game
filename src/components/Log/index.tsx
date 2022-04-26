import React, { useState } from 'react';
import type { CTX } from '../../types';

export default function Log({ ctx }: { ctx: CTX }) {
  const [events, setEvents] = useState(ctx.gameData.log.getEvents());

  return (
    <div>
      {events.map(event => {
        return <div>{event.text}</div>;
      })}
    </div>
  );
}
