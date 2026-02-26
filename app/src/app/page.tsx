import { client } from '@/lib/sanity';
import { homePageQuery } from '@/lib/queries';
import { HomePageData } from '@/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import News from '@/components/News';
import VideoSection from '@/components/VideoSection';
import Gallery from '@/components/Gallery';
import Schedule from '@/components/Schedule';
import Sponsors from '@/components/Sponsors';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

async function getHomePageData(): Promise<HomePageData> {
  return await client.fetch(homePageQuery, {}, { next: { revalidate: 60 } });
}

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <Header settings={data.siteSettings} hasSponsors={data.sponsors && data.sponsors.length > 0} />
      <main>
        <Hero hero={data.hero} />
        <Bio bio={data.bio} />
        <News articles={data.newsArticles} />
        <VideoSection videos={data.videos} />
        <Gallery images={data.galleryImages} />
        <Schedule events={data.scheduleEvents} />
        <Sponsors sponsors={data.sponsors} />
        <ContactForm contactSection={data.contactSection} />
      </main>
      <Footer settings={data.siteSettings} />
      <CookieConsent />
    </>
  );
}
