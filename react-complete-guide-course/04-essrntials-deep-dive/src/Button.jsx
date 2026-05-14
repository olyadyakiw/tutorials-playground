function Button({ children, Icon, mode = 'filled', ...props }) {
    return (
        <button className={`btn ${mode === 'outline' ? 'outline' : ''}${mode === 'text' ? 'text' : ''}`}>
            {Icon}
            {children}
        </button>
    )
}

export default Button
