const Show = ({ when, children }: { when: boolean; children: React.ReactNode }) => {
  return when ? <>{children}</> : <></>
}

export default Show
