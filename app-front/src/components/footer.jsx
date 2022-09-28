const Footer = () => {
  return (
    <p className="border-top pt-3 text-center">
      <span>
        Shop <i className="bi bi-suit-heart"></i> Now
      </span>
      <span className="mx-1">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </p>
  )
}

export default Footer
