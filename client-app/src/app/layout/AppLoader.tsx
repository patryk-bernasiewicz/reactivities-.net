import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content?: string;
}

const AppLoader = ({ inverted, content }: Props) => (
  <Dimmer active={true} inverted={inverted}>
    <Loader content={content} />
  </Dimmer>
);

export default AppLoader;
