import { Modal, Button, Spin, Dropdown, MenuProps } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { logoutUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";


interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarModal = ({ isOpen, onClose }: AvatarModalProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useGetMeQuery(undefined, {
    skip: !isOpen,
  });

  

  
  const userMenuItems: MenuProps["items"] = [
    { key: "1", label: "View All Orders", onClick: () => navigate(`/user/orders/${user.data._id}`) },
    { key: "2", label: "Update Password", onClick: () => navigate("/user/update-password") },
  ];

  
  const adminMenuItems: MenuProps["items"] = [
    { key: "1", label: "All Users", onClick: () => navigate("/admin/all-users") },
    {
      key: "2",
      label: "Product Management",
      children: [
        { key: "2-1", label: "Create Book", onClick: () => navigate("/admin/create-book") },
        { key: "2-2", label: "All Products", onClick: () => navigate("/admin/all-product") },
        { key: "2-3", label: "Update & Delete Products", onClick: () => navigate("/admin/update-delete") },
      ],
    },
    {
      key: "3",
      label: "Order Management",
      children: [
        { key: "3-1", label: "Get Orders", onClick: () => navigate("/admin/orders") },
        { key: "3-2", label: "Update & Delete Orders", onClick: () => navigate("/admin/orders/update-delete") },
      ],
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      getContainer={false}
      style={{ top: 20, right: 0, position: "absolute", width: 300 }}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : user ? (
        <div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{user?.data?.name}</h3>
            <p className="text-gray-500">{user?.data?.email}</p>
          </div>

          <div className="mt-4 ml-2">
            <Dropdown menu={{ items: user?.data?.role === "admin" ? adminMenuItems : userMenuItems }} trigger={["click"]}>
              <p className="text-lg font-bold border-b-1 p-4 cursor-pointer">Dashboard</p>
            </Dropdown>
            <p className="text-lg font-bold border-b-1 p-4 cursor-pointer" onClick={() => navigate(`/${user?.data?.role}/profile`)}>
              My Profile
            </p>
          </div>

          <div className="flex justify-left gap-4 mt-5 ml-2 p-4">
            <Button type="default" onClick={() => {
              dispatch(logoutUser());
            }}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No user found</p>
      )}
    </Modal>
  );
};

export default AvatarModal;
