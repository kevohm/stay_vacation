import { useGlobal } from "../../context/AppContext";
import { removeCookie } from "../../context/utils";
import { actions } from "../../context/appActions";
import useMutation from "../../hooks/useMutation";

/**
 * Custom hook to handle user logout logic.
 *
 * @returns {{
 *   logout: () => Promise<void>,
 *   isLoading: boolean,
 *   isError: boolean,
 *   error: any
 * }}
 */
const useLogout = () => {
  const { dispatch } = useGlobal();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    method: "post",
    path: "auth/logout",
  });

  const logout = async () => {
    try {
      await mutateAsync(
        {},
        {
          onSuccess: () => {
            dispatch({
              type: actions.LOGOUT,
              payload: { userD: { id: null, role: null } },
            });
            removeCookie("_v");
          },
          onError: (err) => {
            console.error("Logout failed:", err);
          },
        }
      );
    } catch (err) {
      console.error("Unexpected logout error:", err);
    }
  };

  return { logout, isLoading, isError, error };
};

export default useLogout;
