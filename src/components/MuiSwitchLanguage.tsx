import * as React from 'react';
import clsx from 'clsx';
import {styled} from '@mui/system';
import {useSwitch, UseSwitchProps} from '@mui/core/SwitchUnstyled';

const SwitchRoot = styled('span')(`
  display: inline-block;
  position: relative;
  width: 62px;
  height: 34px;
  padding: 7px;
`);

const SwitchInput = styled('input')(`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`);

const SwitchThumb = styled('span')(
    ({theme}) => `
  position: absolute;
  display: block;
  background-color: ${theme.palette.mode === 'dark' ? '#9ab6d7' : '#0668ce'};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  top: 1px;
  left: 7px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 1024 1024'><path fill='${encodeURIComponent(
        '#fff',
    )}' d='M555.231787 330.203429v-107.997284h-68.202727v108.038827H263.433935v273.457531H487.02906v210.976899h68.202727V603.70431h224.21827V330.203429H555.231787z m-68.202727 209.074952h-157.337694v-144.605675h157.335888v144.605675z m226.131053 0H555.195662v-144.605675h157.962645v144.605675z'/></svg>') center center no-repeat;
  }

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(16px);
    
    &:before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 1024 1024'><path fill='${encodeURIComponent(
        '#000',
    )}' d='M176.640046 899.55778c16.427134-42.954301 32.57593-85.213777 48.750307-127.464043 35.468816-92.648097 70.910003-185.306426 106.437148-277.93201 33.81106-88.151689 67.722404-176.264493 101.579513-264.398786 10.163477-26.456558 20.363793-52.898791 30.354332-79.420841 1.442862-3.829212 3.365654-5.143137 7.494695-5.120624 32.582069 0.177032 65.166185 0.168846 97.748255 0.00614 3.91517-0.019443 5.362124 1.401929 6.789637 4.9088 40.680515 99.992365 81.544201 199.911052 122.314767 299.867602 36.021401 88.314395 71.929216 176.675862 107.961874 264.98514 24.195052 59.297524 48.444339 118.574582 72.904427 177.762613 2.53166 6.127558 1.284249 6.989181-4.88731 6.938016-33.273824-0.279363-66.551742-0.221034-99.827613-0.025583-4.402263 0.025583-6.199189-1.37737-7.765871-5.481851-27.789926-72.826656-55.833633-145.556097-83.582627-218.398102-1.544169-4.054339-3.309372-5.104251-7.336082-5.100158-101.909018 0.099261-203.818035 0.107447-305.727053-0.026606-4.193509-0.005117-6.02318 1.327228-7.399527 5.16565-25.988908 72.483848-52.151777 144.906298-78.07724 217.412658-1.760087 4.922103-4.063549 6.499018-9.293667 6.456039C242.49901 899.425773 209.91694 899.55778 176.640046 899.55778zM517.205559 225.942939c-8.67866 37.301558-17.814738 74.192769-30.121018 110.200868-28.318976 82.862219-60.925604 164.144454-91.261517 246.264776-2.480494 6.713912-0.418532 6.739495 5.099135 6.730285 80.375585-0.134053 160.751171-0.085958 241.126756-0.122797 2.212388-0.001023 4.533246 0.595564 6.811126-0.64366C605.469811 467.402269 555.3626 348.938204 517.205559 225.942939z'/></svg>');
    }
  }
`,
);

const SwitchTrack = styled('span')(
    ({theme}) => `
  background-color: ${theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: block;
`,
);

function MUISwitch(props: UseSwitchProps) {
    const {getInputProps, checked, disabled, focusVisible} = useSwitch(props);

    const stateClasses = {
        checked,
        disabled,
        focusVisible,
    };

    return (
        <SwitchRoot className={clsx(stateClasses)}>
            <SwitchTrack>
                <SwitchThumb className={clsx(stateClasses)}/>
            </SwitchTrack>
            <SwitchInput {...getInputProps()} aria-label='languages switch'/>
        </SwitchRoot>
    );
}

export default function MuiSwitchLanguage(props: any) {
    const {checked, onChange} = props;
    return <MUISwitch checked={checked} onChange={onChange}/>;
}
