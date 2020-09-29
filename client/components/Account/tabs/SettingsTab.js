import { useRecoilState } from 'recoil';
import { themeState } from '@/Recoil/themeState';

import { Button } from '@material-ui/core';

const SettingsTab = () => {
  const [themeObj, setThemeObj] = useRecoilState(themeState);
  return (
    <div>
      <div>WHats Harder, Life or Mr Tron. Mr Tron huh</div>
      <div>
        <Button onClick={() => setThemeObj({})}>SET THEME</Button>
      </div>
    </div>
  );
};

export default SettingsTab;
