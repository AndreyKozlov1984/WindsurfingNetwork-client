let s:eslint_path = system('PATH=$(npm bin):$PATH && which eslint')
let g:syntastic_javascript_eslint_exec = substitute(s:eslint_path, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')

augroup ft_javascript
    autocmd!
    autocmd BufWritePre * silent! Neoformat prettiereslint
    autocmd Filetype javascript setlocal ts=2 sts=2 sw=2
augroup END

