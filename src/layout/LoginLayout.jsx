import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div>
      {/* NavBar 없이 보여줄 기본 레이아웃 */}
      <Outlet />
    </div>
  );
};

export default LoginLayout;
