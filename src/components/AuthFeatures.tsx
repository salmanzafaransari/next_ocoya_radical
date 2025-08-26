import { Clock, Zap, Bot, BarChart3 } from "lucide-react";

export default function AuthFeatures() {
  return (
    <div className="h-full w-full bg-white py-4 sm:max-w-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">
        AI-powered social media management
      </h2>

      <div className="space-y-5">
        {/* Feature 1 */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <Clock size={20} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-gray-800 text-base">
              AI-powered scheduling
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              AI analyzes engagement trends to schedule posts at optimal times,
              ensuring maximum reach and engagement for your audience across platforms.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-gray-800 text-base">
              Quick content creation
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Generate engaging captions, hashtags, and visuals with AI tailored to your
              brand’s voice, saving time and elevating your social media strategy.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <Bot size={20} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-gray-800 text-base">
              Intelligent workflow automation
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Automate time-consuming tasks like post scheduling, comment moderation,
              and brand monitoring with AI, giving you more time to focus on impactful strategies.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-gray-800" />
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-gray-800 text-base">
              Smart analytics insights
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Use AI-driven analytics to uncover engagement trends, measure campaign success,
              and gain actionable insights for consistently improving your social media performance.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg font-semibold mt-10">
        Trusted by 100,000+ businesses worldwide.
      </p>
    </div>
  );
}
