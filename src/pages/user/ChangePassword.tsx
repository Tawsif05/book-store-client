import { Button} from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../../redux/features/auth/authApi';
import BForm from '../../components/form/BForm';
import BInput from '../../components/form/BInput';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';


const ChangePassword = () => {
 
  const [changePassword, { isLoading}] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    console.log(data);

    
    const res =  await changePassword(data);

    if (res?.data?.success){
        dispatch(logout());
        navigate('/login')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px]">
        <h3 className="text-xl font-bold mb-4">Change Password</h3>
        
        <BForm onSubmit={onSubmit}>
          {/* Old Password Input */}
          <BInput 
            type="text"
            name="oldPassword"
            label="Old Password"
            disabled={isLoading}
          />

          {/* New Password Input */}
          <BInput 
            type="text"
            name="newPassword"
            label="New Password"
            disabled={isLoading}
          />

          <div className="flex justify-center">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading} 
              disabled={isLoading}
            >
              Change Password
            </Button>
          </div>
        </BForm>

        
      </div>
    </div>
  );
};

export default ChangePassword;
