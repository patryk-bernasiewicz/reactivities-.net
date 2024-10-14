import { Dimmer } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
}

const Loader = ({ inverted, content }: Props) => (
  <Dimmer active={true} inverted={inverted}>
    <Loader content={content} />
  </Dimmer>
);

export default Loader;
