import React from 'react';
import HomeHeader from '../components/homeComponents/homeHeader';
import HomeMain from '../components/homeComponents/homeMain';
import HomeFooter from '../components/homeComponents/homeFooter';


function HomePage(){
	return (
		<div>
			<HomeHeader />
			<HomeMain />
			<HomeFooter / >
		</div>
	);
}

export default HomePage;