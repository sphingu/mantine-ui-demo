import { Breadcrumbs, Anchor } from '@mantine/core'
import { Link, useMatches } from '@tanstack/react-router'

const items = [
  { title: 'Home', href: '/' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
))

export const AppBreadcrumb = () => {
  const matches = useMatches()
  // {
  //   matches
  //     // skip routes that don't have a breadcrumb, like is the case of our '/' route
  //     // .filter((match) => match.route.meta?.breadcrumb)
  //     .map((match) => (
  //       <li key={match.pathname}>
  //         <Link to={match.pathname} search={{ q: true }}>
  //           one {match.pathname}
  //           {/* {match .route.meta!.breadcrumb(match.params)} */}
  //         </Link>
  //       </li>
  //     ))
  // }
  return (
    <Breadcrumbs separator="→" my="xs">
      {items}
    </Breadcrumbs>
  )
}
