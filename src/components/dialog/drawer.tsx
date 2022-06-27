import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";

type Props = BottomSheetProps;

const Drawer: React.VFC<Props> = ({ children, ...props }) => {
  return <BottomSheet {...props}>{children}</BottomSheet>;
};

export default Drawer;
