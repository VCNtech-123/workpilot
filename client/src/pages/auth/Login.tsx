import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-app text-app flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <img
            src={Logo}
            alt="WorkPilot Logo"
            className="w-14 h-14 object-contain mb-3"
          />
          <h1 className="text-2xl font-semibold text-primary">
            WorkPilot
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Manage your freelance workflow
          </p>
        </div>

        <Card>
          <div className="space-y-6">

            <div>
              <h2 className="text-xl font-semibold">
                Welcome Back
              </h2>
              <p className="text-sm opacity-70 mt-1">
                Sign in to your account
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button className="w-full">
              Sign In
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

      </div>
    </div>
  );
};

export default Login;