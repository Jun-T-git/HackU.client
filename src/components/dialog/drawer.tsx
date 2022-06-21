import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";

type Props = BottomSheetProps;

const Drawer: React.VFC<Props> = ({ children, ...props }) => {
  console.log(children);
  return <BottomSheet {...props}>{children}</BottomSheet>;
};

export default Drawer;
