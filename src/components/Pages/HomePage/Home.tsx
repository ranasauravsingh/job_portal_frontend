import NavBar from "@/components/Shared/NavBar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "@/components/Shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
	useGetAllJobs();

	return (
		<div>
			<NavBar />
			<HeroSection />
			<CategoryCarousel />
			<LatestJobs />
			<Footer />
		</div>
	);
};

export default Home;
