import { DashLayout } from '@/components/layouts';
import Image from 'next/image';

const integrations = [
  {
    section: 'Store Platforms',
    items: [
      {
        name: 'Shopify',
        icon: '/assets/icons/shopify.png',
        description: 'Integrate your Shopify store with us',
      },
      {
        name: 'WooCommerce',
        icon: '/assets/icons/woocommerce.png',
        description: 'Integrate your WooCommerce store with us',
      },
      {
        name: 'WordPress',
        icon: '/assets/icons/wordpress.png',
        description: 'Integrate your Wordpress website with us',
      },
    ],
  },
  {
    section: 'Tracking Pixels',
    items: [
      {
        name: 'Google Tag Manager',
        icon: '/assets/icons/gtm.png',
        description: 'Integrate your Google tag manager with us',
      },
      {
        name: 'Google Analytics',
        icon: '/assets/icons/ga.png',
        description: 'Integrate your Google Analytics with us',
      },
      {
        name: 'Google Ads',
        icon: '/assets/icons/googleads.png',
        description: 'Integrate your Google Ads with us',
      },
      {
        name: 'Facebook Ads',
        icon: '/assets/icons/facebookads.png',
        description: 'Integrate your Facebook with us',
      },
      { name: 'TikTok Ads', icon: '/assets/icons/tiktok.png', description: 'Integrate your Tiktok with us' },
    ],
  },
  {
    section: 'Own Integration',
    items: [
      {
        name: 'API Integration',
        icon: '/assets/icons/api.png',
        description: 'Integrate your API service with us',
      },
      {
        name: 'Webhook',
        icon: '/assets/icons/webhook.png',
        description: 'Integrate your custom webhook with us',
      },
    ],
  },
];

const IntegrationPage = () => {
  return (
    <DashLayout
      titleArea={
        <>
          <h2 className="text-xl font-semibold">Choose your API integration system</h2>
        </>
      }
    >
      <div className="p-6 bg-white rounded-lg space-y-10">
        {integrations.map((group) => (
          <div key={group.section}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{group.section}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col p-4 border border-gray-100 rounded-lg transition cursor-pointer hover:bg-gray-100"
                >
                  <Image src={item.icon} alt={item.name} width={48} height={48} className="mb-3" />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-3 mt-1">{item.description}</p>
                    </div>
                    <button className="text-red-500 text-sm font-semibold flex items-center gap-1 cursor-pointer">
                      Connect Now <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  );
};

export default IntegrationPage;
