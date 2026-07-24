import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

const Login = () => {

    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken );

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleSubmit = async () => {
      setError(null);
      setLoading(true);

      try {
        const res = await login({ email, password });

        setToken(res.token);
        navigate("/")
      } catch (err: any) {
        setError(
          err?.respoonse?.data?.message ||
          "Login failed. Please try again."
        );
      } finally {
        setLoading(false)
      }
    };

  return (
        <Card>
          <div className="space-y-6">

            {/* ✅ Header */}
            <div>
              <h2 className="text-xl font-semibold">
                Welcome Back
              </h2>
              <p className="text-sm opacity-70 mt-1">
                Sign in to continue to your workspace
              </p>
            </div>

            {/* ✅ Form */}
            <form className="space-y-4">

              <div>
                <label className="block text-sm mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            </form>

            {error && (
              <div className="text-sm text-(--color-danger)">
                {error}
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-sm text-center opacity-70">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>

          </div>
        </Card>
  );
};

export default Login;