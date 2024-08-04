import { Helmet } from 'react-helmet-async';

import type { MetadataContent, MetadataProps } from '../../types';

export const metadataContent: MetadataContent = {
	siteName: 'MetaCritic 100',
	defaultTitle: 'Track Top-Rated Films',
	defaultDescription:
		"Track your viewing progress through Metacritic's top-rated films. An unofficial, fun project for movie enthusiasts.",
	author: 'Dan Edwards',
	siteUrl: 'https://www.metacritic100.com',
	defaultImage: 'https://www.metacritic100.com/metacritic100.png',
};

export default function Metadata({
	title,
	description,
	pageName,
	slug,
}: MetadataProps) {
	const pageTitle = pageName
		? `${pageName} | ${metadataContent.siteName} - ${
				title || metadataContent.defaultTitle
		  }`
		: `${metadataContent.siteName} - ${
				title || metadataContent.defaultTitle
		  }`;

	const metaDescription = description || metadataContent.defaultDescription;
	const pageUrl = slug
		? `${metadataContent.siteUrl}/${slug}`
		: metadataContent.siteUrl;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="author" content={metadataContent.author} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={metadataContent.siteUrl} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={metadataContent.defaultImage} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta name="twitter:image" content={metadataContent.defaultImage} />

			{/* URLs */}
			<meta property="og:url" content={pageUrl} />
			<link rel="canonical" href={pageUrl} />
		</Helmet>
	);
}
