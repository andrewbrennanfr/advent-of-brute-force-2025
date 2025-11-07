const [, , input = "00", output = "00"] = Bun.argv

;[...new Bun.Glob("*").scanSync(`src/${input}/`)].forEach((file) =>
    Bun.file(`src/${input}/${file}`)
        .text()
        .then((text) => text.replaceAll(`@/${input}`, `@/${output}`))
        .then((content) => Bun.write(`src/${output}/${file}`, content)),
)
