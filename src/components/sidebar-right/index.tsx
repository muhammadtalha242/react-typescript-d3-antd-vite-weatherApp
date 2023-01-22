import { SideBarRightContainer } from "./container";
import LocationDetails from "./location-details";
import Weather from "./weather";

const SideBarRight = () => {
  return <SideBarRightContainer>
    <LocationDetails />
    <Weather />
  </SideBarRightContainer>;
};

export default SideBarRight;
