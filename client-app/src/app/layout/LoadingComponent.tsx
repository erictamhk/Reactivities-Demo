import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default function LoadingComponent({
  inverted,
  content,
}: {
  inverted: boolean;
  content: string;
}) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
